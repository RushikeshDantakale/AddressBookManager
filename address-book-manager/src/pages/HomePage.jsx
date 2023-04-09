import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact, updateContact } from "../store/createSlice";

const HomePage = () => {
  const [tab, setTab] = useState(0);
  const [tab1Opacity, setTab1Opacity] = useState("");
  const [tab2Opacity, setTab2Opacity] = useState("opacity-1");
  const [hidden, setHidden] = useState("hidden");
  const [search, setSearch] = useState("");

  const [updateInformation, setUpdateInformation] = useState({
    contactName: "",
    contactNumber: "",
  });

  const [contactUpdate, setContactUpdate] = useState({
    name: "",
    number: "",
  });
  const [contactInfo, setContactInfo] = useState({
    name: "",
    number: "",
  });
  const dispatch = useDispatch();

  var contact = useSelector((state) => state.rootReducer.addContact);

  var assContact = [...contact];

  assContact = assContact.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  const update = () => {
    dispatch(
      updateContact({
        name: contactUpdate.name,
        updatedName: updateInformation.contactName,
        updatedNumber: updateInformation.contactNumber,
      })
    );
    alert("contact updated!");
    setHidden("hidden");
    setUpdateInformation({
      contactName: "",
      contactNumber: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleCreate = (data) => {
    const isFound = contact.some((element) => {
      if (element.name === data.name || element.number === data.number) {
        return true;
      }
      return false;
    });

    if (isFound) {
      alert("already exists");
      setContactInfo({
        name: "",
        number: "",
      });
    } else {
      if (data.name === "" || data.number == "") {
        alert("input fields must not be empty!");
        setContactInfo({
          name: "",
          number: "",
        });
      } else {
        dispatch(addContact(data));
        setContactInfo({
          name: "",
          number: "",
        });
      }
    }
  };

  const updateInfo = (e) => {
    const { name, value } = e.target;
    setUpdateInformation({ ...updateInformation, [name]: value });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <h1>Address Book Manager</h1>
      <div className="container">
        <div className="tabs">
          {" "}
          <div
            className={`tab outline round-left ${tab1Opacity}`}
            onClick={() => {
              setTab(0);
              setTab2Opacity("opacity-1 ");
              setTab1Opacity("");
            }}
          >
            {" "}
            <div>Contacts</div>
          </div>
          <div
            className={`tab outline round-right ${tab2Opacity}`}
            onClick={() => {
              setTab(1);
              setTab1Opacity("opacity-1 ");
              setTab2Opacity("");
            }}
          >
            Add new contact{" "}
          </div>
        </div>

        {tab === 0 ? (
          <>
            <div className="heading">
              {" "}
              <input
                className="input"
                placeholder="search for name here..."
                name="search"
                value={search}
                onChange={handleSearch}
                type="text"
              />
            </div>
            <div className={`editContact ${hidden}`}>
              <div className="inputBox">
                {" "}
                <input
                  type="text"
                  className="input"
                  name="contactName"
                  value={updateInformation.contactName}
                  onChange={updateInfo}
                  placeholder={contactUpdate.name}
                />
              </div>
              <div className="inpt-box2">
                <input
                  type="text"
                  className="input"
                  placeholder={contactUpdate.number}
                  name="contactNumber"
                  value={updateInformation.contactNumber}
                  onChange={updateInfo}
                />{" "}
              </div>
              <div className="btn-update">
                <button
                  className="btnUpdate"
                  onClick={() => {
                    update();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="data">
              {assContact &&
                assContact
                  .filter((item) => {
                    return item.name.toLowerCase() === ""
                      ? item
                      : item.name.toLowerCase().includes(search) ||
                          item.number.includes(search);
                  })
                  .map((ele, index) => {
                    {
                      console.log(ele);
                    }

                    return (
                      <>
                        <div className="contact">
                          <div className="flex-1">
                            <div>{ele.name}</div>
                          </div>
                          <div className="flex-1">
                            <div>{ele.number}</div>
                          </div>
                          <button
                            className="flex-0_1"
                            onClick={() => {
                              setContactUpdate({
                                name: ele.name,
                                number: ele.number,
                              });
                              if (hidden === "hidden") setHidden("");
                              else setHidden("hidden");
                            }}
                          >
                            edit
                          </button>
                          <button
                            onClick={() => {
                              dispatch(deleteContact(ele.name));
                            }}
                            className="btn-delete  "
                          >
                            delete
                          </button>
                        </div>
                      </>
                    );
                  })}
            </div>
          </>
        ) : (
          <div className="newContact">
            <div className="label">
              <label className="label">name</label>
            </div>
            <div className="">
              <input
                className="input"
                type="text"
                value={contactInfo.name}
                name="name"
                onChange={handleChange}
                placeholder="enter name"
              />
            </div>
            <div className="label">
              <label>Contact Number</label>
            </div>
            <div className="">
              <input
                className="input"
                type="text"
                value={contactInfo.number}
                name="number"
                onChange={handleChange}
                placeholder="enter number"
              />
            </div>
            <button
              className="btnCreate"
              onClick={() => handleCreate(contactInfo)}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
