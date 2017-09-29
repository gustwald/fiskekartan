import React, { Component } from "react";
import { Checkbox } from "antd";
import fishNames from "../constants/fishNames.js";
import "../App.css";

function FilterFish(props) {
  const isChecked = fish => props.selected.includes(fish);
  return (
    <div className="filterFish">
      <p className="filterText">Filtrera på art</p>
      <Checkbox
        checked={isChecked(fishNames.pike)}
        onChange={() => props.onChange(fishNames.pike)}
      >
        {fishNames.pike}
      </Checkbox>
      <Checkbox
        checked={isChecked(fishNames.perch)}
        onChange={() => props.onChange(fishNames.perch)}
      >
        {fishNames.perch}
      </Checkbox>
      <Checkbox
        checked={isChecked(fishNames.salmon)}
        onChange={() => props.onChange(fishNames.salmon)}
      >
        {fishNames.salmon}
      </Checkbox>
      <Checkbox
        checked={isChecked(fishNames.zander)}
        onChange={() => props.onChange(fishNames.zander)}
      >
        {fishNames.zander}
      </Checkbox>
      <Checkbox
        checked={isChecked(fishNames.eel)}
        onChange={() => props.onChange(fishNames.eel)}
      >
        {fishNames.eel}
      </Checkbox>
    </div>
  );
}

export default FilterFish;
