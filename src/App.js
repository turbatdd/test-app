import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const initData = [
    { name: "Orange", value: 1 },
    { name: "Forest", value: 2 },
    { name: "Slate", value: 3 },
  ];

  const [data, setData] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setData(initData);
  }, []);

  const onClickedItem = (val) => {
    console.log("hahah");
    setSelectedList([...selectedList, val]);
    setData(data.filter((item) => item.value != val.value));
    setSearchVal("");
  };

  const removeSelectedItem = (val) => {
    setData([...data, val]);
    setSelectedList(selectedList.filter((item) => item.value != val.value));
  };

  const resetAll = () => {
    console.log("resetiin all");
    setData(initData);
    setSelectedList([]);
  };

  const checkDataExist = (val) => {
    if (searchVal == "" || val.name.toLowerCase().indexOf(searchVal) > -1) {
      return true;
    }

    return false;
  };

  return (
    <div className="main">
      <div className="my-custom-select">
        <div className="my-select">
          <div className="selected-list">
            {selectedList.map((val, i) => {
              return (
                <div
                  className="selected-item"
                  onClick={() => removeSelectedItem(val)}
                >
                  <span>{val.name + " x"}</span>
                </div>
              );
            })}
          </div>
          <input
            value={searchVal}
            onChange={(val) => {
              setSearchVal(val.target.value);
            }}
            onFocus={() => setShow(true)}
            // onBlur={() => setShow(false)}
            className="my-select-input"
          ></input>
          <div className="btns">
            <div className="btn" onClick={resetAll}>
              X
            </div>
            <div className="btn" onClick={() => setShow(!show)}>
              {show ? "close" : "show"}
            </div>
          </div>
        </div>
        <div className="data-list" style={{ display: show ? "block" : "none" }}>
          <ul >
            {data.map((val) => {
              if (checkDataExist(val)) {
                return (
                  <li
                    key={`list-key-${val.value}`}
                    onClick={() => {
                      onClickedItem(val);
                    }}
                    style={{ padding: 10 }}
                  >
                    {val.name}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
