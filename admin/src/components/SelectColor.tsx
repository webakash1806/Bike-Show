import React from "react";
import { SketchPicker, ColorResult } from "react-color";

interface colorProp {
    color: string;
    setColor: (colorCode: string) => void;
    onClose: () => void
}

const ColorPicker: React.FC<colorProp> = ({ color, setColor, onClose }) => {

    const handleColorChange = (newColor: ColorResult) => {
        setColor(newColor.hex);
    };

    return (
        <>
            <h1 className="font-semibold text-center text-black">Select Color</h1>
            <SketchPicker
                color={color}
                onChange={handleColorChange}
                onChangeComplete={() => onClose()}
                presetColors={[]}
            />

        </>
    );
};

export default ColorPicker;
