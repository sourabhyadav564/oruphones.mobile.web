import { Disclosure } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import passIcon from "@/assets/check2-circle.svg";
import failedIcon from "@/assets/testFail.png";
import pass from "@/assets/pass1.png";
import { useEffect, useState } from "react";
import { deviceConditionQuestion } from "@/utils/constant";
import ConditionOptionLarge from "./Condition/ConditionOptionLarge";

function ViewReport({ data, defaultOpen, setDefaultOpen }) {
  if (!data?.verified || !data?.cosmetic) {
    return null;
  }

  const [questionIndex, setQuestionIndex] = useState(0);

  console.log("data", data?.cosmetic);

  return (
    <div className="w-full mx-auto bg-white p-4 mb-4 border-t border-b">
      <Disclosure defaultOpen={defaultOpen || false}>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full">
              <div
                className="flex justify-between items-center w-full bg-white"
                onClick={() => {
                  if (defaultOpen && setDefaultOpen) {
                    setDefaultOpen(false);
                  }
                }}
              >
                <h2 className="text-gray-20 font-semibold">Device Report</h2>
                <FiChevronDown
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-gray-70`}
                />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="px-1 mt-3 text-sm text-gray-70 divide-y">
              <div className="">
                {data && data?.cosmetic && (
                  <h2 className="text-gray-20 font-semibold mb-3">
                  Device Cosmetic Report
                </h2>
                  )}
                {data && data?.cosmetic && (
                  <div>
                    {deviceConditionQuestion.map((item, index) => (
                      <div>
                        <span className="text-lg font-semibold text-black">{item?.title}</span>
                        <ConditionOptionLarge
                          title={data?.cosmetic[index]}
                          options={item?.options[0]?.options}
                          conditionResults={data?.cosmetic}
                          questionIndex={index}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {data?.verified && (
                <>
                  <div className="pb-3">
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
                  <div className="pt-3">
                    <h2 className="text-gray-20 font-semibold mb-3">
                      Device Verification Report
                    </h2>
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
                </>
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
    <p> {testName} </p>
    <p className="flex items-center justify-between w-16">
      <span> {testStatus} </span>
      <Image
        width={25}
        height={23}
        objectFit="contain"
        src={testStatus === "PASS" ? passIcon : failedIcon}
      />
    </p>
  </div>
);

const Results = ({ question, result, childQuestions, index }) => {
  return (
    <div className="w-full py-1">
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
