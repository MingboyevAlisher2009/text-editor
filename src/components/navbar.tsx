import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  Italic,
  List,
  ListOrdered,
  Menu,
  Strikethrough,
  Underline,
  X,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { execCommand } from "./formatting-utils";

const fontSizes = [
  { value: 1, label: "8pt" },
  { value: 2, label: "10pt" },
  { value: 4, label: "14pt" },
  { value: 5, label: "16pt" },
  { value: 6, label: "18pt" },
  { value: 7, label: "24pt" },
];

const fontFamilies = [
  { value: "Arial", label: "Arial" },
  { value: "Verdana", label: "Verdana" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Georgia", label: "Georgia" },
  { value: "Garamond", label: "Garamond" },
  { value: "Courier New", label: "Courier New" },
  { value: "Consolas", label: "Consolas" },
  { value: "Lucida Console", label: "Lucida Console" },
  { value: "Segoe UI", label: "Segoe UI" },
  { value: "Impact", label: "Impact" },
];

const Navbar = () => {
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const colorRef = useRef<HTMLInputElement | null>(null);
  const bgColorRef = useRef<HTMLInputElement | null>(null);
  const [colors, setColors] = useState({
    color: "#000",
    bg: "#000",
  });

  const handleChangeColors = (command: string, value: string) => {
    if (command === "foreColor") {
      setColors({ ...colors, color: value });
    } else {
      setColors({ ...colors, bg: value });
    }
    execCommand(command, value);
  };

  return (
    <nav className="w-[90%] left-1/2 -translate-x-1/2 p-4 top-5 max-w-7xl bg-card/50 backdrop-blur-sm rounded-2xl fixed border">
      <div className="w-full flex justify-between items-center gap-2 pb-4 border-b">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Editor</h3>
        </div>
        <div>
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="text-sm sm:text-lg font-medium w-full text-gray-900 dark:text-gray-100 bg-transparent border-none outline-none focus:bg-gray-50 dark:focus:bg-[#1a1a1a] px-2 py-1 rounded-md placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Document title"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="ghost"
            size="sm"
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div
        className={`flex flex-wrap gap-3 pt-4 ${
          isMobileMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="flex sm:items-center gap-2 mr-2 flex-wrap flex-col sm:flex-row">
          <div className="flex items-center">
            <span className="sm:hidden text-xs font-medium text-muted-foreground">
              History:
            </span>
            <Button onClick={() => execCommand("undo")} variant={"ghost"}>
              <CornerUpLeft />
            </Button>
            <Button onClick={() => execCommand("redo")} variant={"ghost"}>
              <CornerUpRight />
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Select onValueChange={(value) => execCommand("fontName", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fonts</SelectLabel>
                  {fontFamilies.map((font) => (
                    <SelectItem
                      key={font.value}
                      value={font.value}
                      style={{ fontFamily: font.value }}
                    >
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => execCommand("fontSize", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Font sizes</SelectLabel>
                  {fontSizes.map((font, i) => (
                    <SelectItem key={i} value={font.value.toString()}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator orientation="vertical" className="w-1 h-6" />

        <div className="flex items-center gap-2 mr-2">
          <Button onClick={() => execCommand("bold")} variant={"ghost"}>
            <Bold className="h-4 w-4" />
          </Button>

          <Button onClick={() => execCommand("italic")} variant={"ghost"}>
            <Italic className="h-4 w-4" />
          </Button>

          <Button onClick={() => execCommand("underline")} variant={"ghost"}>
            <Underline className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => execCommand("strikethrough")}
            variant={"ghost"}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>

          <div className="relative">
            <Button
              onClick={() => colorRef.current?.click()}
              className={`rounded-full border`}
              style={{ backgroundColor: colors.color }}
            ></Button>
            <Input
              ref={colorRef}
              onChange={(e) => handleChangeColors("foreColor", e.target.value)}
              className="opacity-0 pointer-events-none absolute"
              type="color"
              placeholder="text color"
            />
          </div>

          <div className="relative">
            <Button
              onClick={() => bgColorRef.current?.click()}
              className={`rounded-full border`}
              style={{ backgroundColor: colors.bg }}
            ></Button>
            <Input
              ref={bgColorRef}
              onChange={(e) =>
                handleChangeColors("hiliteColor", e.target.value)
              }
              className="opacity-0 pointer-events-none absolute"
              type="color"
              placeholder="text color"
            />
          </div>
        </div>

        <Separator orientation="vertical" className="w-1 h-6" />

        <div className="flex items-center gap-2 mr-2">
          <Button onClick={() => execCommand("justifyLeft")} variant={"ghost"}>
            {" "}
            <AlignLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => execCommand("justifyCenter")}
            variant={"ghost"}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>

          <Button onClick={() => execCommand("justifyRight")} variant={"ghost"}>
            <AlignRight className="h-4 w-4" />
          </Button>

          <Button onClick={() => execCommand("justifyFull")} variant={"ghost"}>
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="w-1 h-6" />

        <div className="flex items-center gap-2 mr-2">
          <Button
            onClick={() => execCommand("insertUnorderedList")}
            variant="ghost"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => execCommand("insertOrderedList")}
            variant="ghost"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
