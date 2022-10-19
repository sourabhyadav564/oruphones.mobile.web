import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import passIcon from "@/assets/check2-circle.svg";
import failedIcon from "@/assets/testFail.png";
import pass from "@/assets/pass1.png";
import { useEffect, useState } from "react";
import { deviceConditionQuestion } from "@/utils/constant";
import ConditionOptionLarge from "./Condition/ConditionOptionLarge";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

function ViewReport({ data, defaultOpen, setDefaultOpen }) {
  if (!data?.verified && !data?.cosmetic) {
    return null;
  }

  const [questionIndex, setQuestionIndex] = useState(0);

  console.log("data", data?.cosmetic);

  return (
    <div className="w-full rounded-md bg-white  p-4 mb-4 bg-[#F9F9F9] ">
      <Disclosure defaultOpen={defaultOpen || false}>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full pb-2">
              <div
                className="flex justify-between  items-center w-full bg-[#F9F9F9]"
                onClick={() => {
                  if (defaultOpen && setDefaultOpen) {
                    setDefaultOpen(false);
                  }
                }}
              >
                <h2 className="font-Medium  text-[14px] text-[#2C2F45] ">Device Report (ORUPhones)</h2>

                <FiChevronDown
                  className={`${open ? "transform rotate-180" : ""
                    } w-5 h-5 text-gray-70`}
                />
              </div>
            </Disclosure.Button>



            <Disclosure.Panel>
              {data?.verified && (
                <div className="border-t pt-2">

                  <div className="pt-2">
                    <div>
                      <h1 className="font-Medium text-[13px] pb-2">Device Verification Report</h1>
                    </div>
                    {data &&
                      data.questionnaireResults &&
                      data.questionnaireResults.map((items, index) => {
                        return (

                          <Results
                            key={index}
                            index={index + 1}
                            question={items.question}
                            result={items.result}
                            childQuestions={items.childQuestions}
                          />
                        );
                      })}
                  </div>
                  <div className="">
                    {/* <h2 className="text-gray-20 font-semibold mb-3">
                      Device Verification Report
                    </h2> */}
                    {data &&
                      data.functionalTestResults &&
                      data.functionalTestResults.map((items, index) => {
                        return (
                          <TestAndStatus
                            key={index}
                            testName={items.displayName}
                            testStatus={items.testStatus}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </Disclosure.Panel>

          </>
        )}
      </Disclosure>
    </div>
  );
}

export default ViewReport;

const TestAndStatus = ({ testName, testStatus }) => (
  <div className="flex justify-between items-center py-2">
    <p className="font-Regular text-[12px]"> {testName} </p>
    <p className="flex items-center justify-between gap-2 capitalize">
      <span className="text-[12px] font-Regular capitalize"> {testStatus} </span>
      {/* <Image
        width={25}
        height={23}
        objectFit="contain"
        src={testStatus === "PASS" ? <BsCheckCircle/> : failedIcon}
      /> */}
      {
        testStatus === "PASS" ? <BsCheckCircle size={13} className="text-red-500 text-[#4CAF50]" /> : <AiOutlineCloseCircle className="text-red-500" size={20} />
      }
    </p>
  </div>
);

const Results = ({ question, result, childQuestions, index }) => {
  return (
    <div className="w-full py-1 capitalize">
      <p>
        {index}.{question}
      </p>
      <div>
        {childQuestions && childQuestions?.length > 0 ? (
          childQuestions.map((items, index1) => (
            <div key={index1} className="flex items-start pt-2">
              <img src={pass.src} className="mt-1 mr-2" />
              <p>{items}</p>
            </div>
          ))
        ) : (
          <div className="flex items-start pt-2">
            <img src={pass.src} className="mt-1 mr-2" />
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};
