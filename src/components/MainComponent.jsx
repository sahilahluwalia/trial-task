import React, { useEffect, useState } from "react";
import searchIcon from "../asserts/search.svg";
import settingMenu from "../asserts/settingMenu.svg";
import Image from "next/image";
import sharePic from "../asserts/share.svg";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import threeDots from "../asserts/threeDots.svg";
import Table from "./Table";
import { assessmentData } from "../data/TableData";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const colorIdentifer = (color) => {
  switch (color) {
    case "purple":
      return {
        backgroundColor: "#E3B7D1",
        textColor: "#AD1A72",
      };
    case "blue":
      return {
        textColor: "#0B6E99",
        backgroundColor: "rgba(58, 137, 171, 0.3)",
      };
    case "green":
      return {
        textColor: "#3D9487",
        backgroundColor: "rgba(61, 148, 135, 0.3)",
      };
    case "yellow":
      return {
        backgroundColor: "rgba(242, 201, 76, 0.2)",
        textColor: "#DFAB01",
      };
    case "orange":
      return {
        textColor: "#D9730D",
        backgroundColor: "rgba(217, 115, 13, 0.3)",
      };
  }
};
const handleCopyToClipboard = () => {
  navigator.clipboard.writeText("Sample Texts");
  alert("Copied to clipboard");
};

const searchAssessmentData = (string) => {
  return assessmentData.filter((data) => {
    return data.assessmentType.toLowerCase().includes(string.toLowerCase());
  });
};

const assessmentTypeColumn = (data) => {
  if (data.shared === true)
    return (
      <div className='flex gap-5 text-xl font-semibold leading-6 text-black '>
        {data.shared && (
          <Image
            onClick={handleCopyToClipboard}
            src={sharePic}
            className='cursor-pointer '
          />
        )}
        {data.assessmentType}
      </div>
    );
  else
    return (
      <div className='flex gap-5 text-xl font-semibold leading-6 text-black '>
        <div className='ml-5'></div>
        {data.assessmentType}
      </div>
    );
};
const skillsTypeColumn = (data) => {
  if (data)
    return (
      <div className='flex gap-5 text-xl font-semibold leading-3 text-black '>
        {data?.map((skill) => {
          const { backgroundColor, textColor } = colorIdentifer(skill.color);
          return (
            <div
              className={`px-[11.5px] py-1 uppercase cursor-pointer rounded-[4px] flex items-center justify-center  text-[10px] font-bold`}
              style={{ backgroundColor: backgroundColor, color: textColor }}
            >
              {skill.name}
            </div>
          );
        })}
      </div>
    );
};
const grayComponent = (string) => {
  return <div className='text-[#333333] font-normal'>{string}</div>;
};

const MainComponent = () => {
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  const searchItems = (search) => {
    if (search) {
      const filteredData = assessmentData.filter((item) => {
        return (
          item.assessmentType.toLowerCase().includes(search.toLowerCase()) ||
          item.subject.toLowerCase().includes(search.toLowerCase()) ||
          item.Year.toString() === search ||
          item.sharedWith.toLowerCase().includes(search.toLowerCase()) ||
          item.assessmentAdmin.toLowerCase().includes(search.toLowerCase())
        );
      });
      return tableDataGenerator(filteredData);
    }
  };
  const handleDeleteItemByID = (id) => {
    const filteredData = assessmentData.filter((item) => item.id !== id);
    setData(tableDataGenerator(filteredData));
  };
  const addDuplicateItem = (id) => {
    const duplicateItem = assessmentData.find((item) => item.id === id);
    duplicateItem.id = assessmentData.length + 1;
    console.log([duplicateItem]);
    console.log(assessmentData);
    console.log(data);
    setData(tableDataGenerator([...assessmentData, duplicateItem]));
    assessmentData.push(duplicateItem);
  };
  const dropMenu = (id) => {
    return (
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className=''>
            <Image src={threeDots} alt='three dots' />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => addDuplicateItem(id)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Duplicate
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      console.log(id);
                      handleDeleteItemByID(id);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Delete
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    type='submit'
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    View Template History
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  const tableDataGenerator = (data) => {
    return data.map((item) => {
      return {
        type: assessmentTypeColumn({
          assessmentType: item.assessmentType,
          shared: item.shared,
        }),
        subject: grayComponent(item.subject),
        year: grayComponent(item.Year),
        sharedWith: grayComponent(item.sharedWith),
        assessmentAdmin: grayComponent(item.assessmentAdmin),
        skills: skillsTypeColumn(item.skills),
        menu: dropMenu(item.id),
      };
    });
  };
  const [data, setData] = useState(tableDataGenerator(assessmentData));

  useEffect(() => {
    if (search) {
      setData(searchItems(search));
    } else if (search == "") {
      setData(tableDataGenerator(assessmentData));
    }
  }, [search]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Assessment Type",
        accessor: "type",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Shared with",
        accessor: "sharedWith",
      },
      {
        Header: "Assessment Admin",
        accessor: "assessmentAdmin",
      },
      {
        Header: "Skills",
        accessor: "skills",
      },
      {
        Header: "",
        accessor: "menu",
      },
    ],

    []
  );

  const handleSort = (string) => {
    console.log(string);
    if (string === "Random") {
      console.log("random");
      const randomData = assessmentData.sort(() => Math.random() - 0.5);
      setData(tableDataGenerator(randomData));
    } else if (string === "Alphabetically") {
      console.log("sorting");
      const sortedData = assessmentData.sort((a, b) => {
        if (a.assessmentType < b.assessmentType) {
          return -1;
        }
        if (a.assessmentType > b.assessmentType) {
          return 1;
        }
        return 0;
      });
      setData(tableDataGenerator(sortedData));
    }
  };

  return (
    <div className='pl-12 pr-6 pb-30'>
      <div className='searchMenu mt-[52px] bg-[#F2F2F2] flex justify-between rounded-md px-3 py-2.5'>
        <Image src={searchIcon} alt='search Icon' />
        <input
          type='text'
          placeholder='Search'
          onChange={(e) => setSearch(e.target.value)}
          className='focus:outline-none w-full bg-[#F2F2F2] ml-4'
        />
        <Image src={settingMenu} alt='setting Menu Icon' />
      </div>

      <div className='buttons mt-[42px] flex justify-between'>
        <div className='left flex gap-[45px]'>
          <button
            onClick={() => addDuplicateItem(assessmentData.length - 1)}
            className='bg-[#333333] py-2.5 px-3.5 text-white rounded-lg shadow-custom'
          >
            + Create Template
          </button>
          <button className='bg-[#333333] py-2.5 px-3.5 text-white rounded-lg shadow-custom'>
            ? Search Discovery
          </button>
        </div>
        <div className='right'>
          <div className='relative flex lg:max-w-sm'>
            <select
              onChange={(e) => {
                handleSort(e.target.value);
              }}
              className=' pt-2 pb-2.5 px-3 text-gray-500 bg-white rounded-[21px] outline-none  '
            >
              <option>Random</option>
              <option selected>Alphabetically</option>
            </select>
          </div>
        </div>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
};

export default MainComponent;
