import { useRef, useState } from "react";
import Navbar from "./components/navbar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./components/ui/context-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  EllipsisVertical,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Subscript,
  Superscript,
  Type,
  Underline,
} from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { execCommand } from "./components/formatting-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

const textTypes = [
  { value: "formatBlock,<p>", label: "Text", icon: Type },
  { value: "formatBlock,<h1>", label: "Heading 1", icon: Heading1 },
  { value: "formatBlock,<h2>", label: "Heading 2", icon: Heading2 },
  { value: "formatBlock,<h3>", label: "Heading 3", icon: Heading3 },
  { value: "formatBlock,<h4>", label: "Heading 4", icon: Heading4 },
  { value: "formatBlock,<h5>", label: "Heading 5", icon: Heading5 },
  { value: "formatBlock,<h6>", label: "Heading 6", icon: Heading6 },
  { value: "insertUnorderedList", label: "Bulleted list", icon: List },
  { value: "insertOrderedList", label: "Numbered list", icon: ListOrdered },
];

const colors = [
  { name: "text-white", value: "#ffffff", ring: "ring-white" },
  { name: "text-gray-400", value: "#9ca3af", ring: "ring-gray-400" },
  { name: "text-orange-400", value: "#f97316", ring: "ring-orange-400" },
  { name: "text-yellow-400", value: "#facc15", ring: "ring-yellow-400" },
  { name: "text-green-400", value: "#22c55e", ring: "ring-green-400" },
  { name: "text-blue-400", value: "#3b82f6", ring: "ring-blue-400" },
  { name: "text-purple-400", value: "#a855f7", ring: "ring-purple-400" },
  { name: "text-pink-400", value: "#ec4899", ring: "ring-pink-400" },
];

const highlightColors = [
  { name: "bg-black", value: "#000000" },
  { name: "bg-gray-600", value: "#4b5563" },
  { name: "bg-orange-700", value: "#b45309" },
  { name: "bg-yellow-700", value: "#ca8a04" },
  { name: "bg-lime-600", value: "#65a30d" },
  { name: "bg-green-500", value: "#22c55e" },
  { name: "bg-blue-500", value: "#3b82f6" },
  { name: "bg-purple-500", value: "#8b5cf6" },
  { name: "bg-pink-500", value: "#ec4899" },
  { name: "bg-white", value: "#ffffff" },
];

const App = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [selectedText, setSelectedText] = useState(colors[0]);
  const [selectedBg, setSelectedBg] = useState(highlightColors[0]);

  const handleSelectColor = (color: any) => {
    setSelectedText(color);
    execCommand("foreColor", color.value);
  };

  const handleSelectBg = (color: any) => {
    setSelectedBg(color);
    execCommand("hiliteColor", color.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-[95%] max-w-7xl mx-auto mt-48 pb-10">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className="w-full dark:bg-card/50 border outline-none rounded-2xl p-5 min-h-screen shadow-xl"
              contentEditable
              suppressContentEditableWarning
              ref={editorRef}
            />
          </ContextMenuTrigger>
          <ContextMenuContent className="w-full flex gap-2 p-2 border-none rounded-full">
            <ContextMenuItem className="rounded-2xl !p-0 !py-0">
              <Select
                onValueChange={(value) =>
                  execCommand(value.split(",")[0], value.split(",")[1])
                }
              >
                <SelectTrigger className="border-none !rounded-2xl hover:!rounded-2xl">
                  <SelectValue placeholder="Text" />
                </SelectTrigger>

                <SelectContent className="border-none rounded-2xl !py-0.5">
                  {textTypes.map((text) => (
                    <SelectItem className="rounded-xl" value={text.value}>
                      <text.icon /> {text.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </ContextMenuItem>
            <Separator orientation="vertical" />
            <ContextMenuItem>
              <Button onClick={() => execCommand("bold")} variant={"ghost"}>
                <Bold className="h-4 w-4" />
              </Button>
            </ContextMenuItem>

            <ContextMenuItem>
              <Button onClick={() => execCommand("italic")} variant={"ghost"}>
                <Italic className="h-4 w-4" />
              </Button>
            </ContextMenuItem>

            <ContextMenuItem>
              <Button
                onClick={() => execCommand("underline")}
                variant={"ghost"}
              >
                <Underline className="h-4 w-4" />
              </Button>
            </ContextMenuItem>

            <ContextMenuItem>
              <Button
                onClick={() => execCommand("strikethrough")}
                variant={"ghost"}
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
            </ContextMenuItem>
            <Separator orientation="vertical" />

            <ContextMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={`bold ${selectedText.name} hover:${selectedText.name}`}
                  >
                    <span className="border px-1.5 rounded-full">A</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="p-4 space-y-4 text-sm">
                    <div>
                      <p className="mb-2 text-gray-300">Text Color</p>
                      <div className="grid grid-cols-4 gap-2">
                        {colors.map((color, idx) => (
                          <Button
                            variant={"ghost"}
                            key={idx}
                            onClick={() => handleSelectColor(color)}
                            className={`rounded-full border p-0 w-5 h-5 ${
                              selectedText.value === color.value
                                ? "ring-2"
                                : "ring-1"
                            }`}
                            style={{ color: color.value }}
                          >
                            A
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-gray-300">Highlight Color</p>
                      <div className="grid grid-cols-5 gap-3">
                        {highlightColors.map((color, idx) => (
                          <Button
                            variant={"ghost"}
                            key={idx}
                            onClick={() => handleSelectBg(color)}
                            className={`w-5 h-5 p-0 rounded-full border ${
                              selectedBg.value === color.value
                                ? "ring-2"
                                : "ring-1"
                            }`}
                            style={{ backgroundColor: color.value }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </ContextMenuItem>

            <ContextMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="flex gap-2">
                    <Button
                      variant={"ghost"}
                      onClick={() => execCommand("superscript")}
                    >
                      <Superscript className="mr-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => execCommand("subscript")}
                    >
                      <Subscript className="mr-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => execCommand("justifyLeft")}
                    >
                      <AlignLeft className="mr-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => execCommand("justifyCenter")}
                    >
                      <AlignCenter className="mr-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => execCommand("justifyRight")}
                    >
                      <AlignRight className="mr-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => execCommand("justifyFull")}
                    >
                      <AlignJustify className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </main>
    </div>
  );
};

export default App;
