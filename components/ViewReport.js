import { Disclosure } from "@headlessui/react";
import DropDown from "@/assets/arrow-drop-down.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deviceConditionQuestion } from "@/utils/constant";
import ConditionOptionLarge2 from "./Condition/ConditionOptionLarge2";

function ViewReport({ data, defaultOpen, setDefaultOpen }) {
  if (!data?.verified && !data?.cosmetic) {
    return null;
  }
  const [questionIndex, setQuestionIndex] = useState(0);
  return (
    <div className="w-full mx-auto rounded-md  p-4 mb-4 bg-[#F9F9F9]">
      <Disclosure defaultOpen={defaultOpen || false}>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full pb-2">
              <div
                className="flex justify-between items-center w-full bg-[#F9F9F9]"
                onClick={() => {
                  if (defaultOpen && setDefaultOpen) {
                    setDefaultOpen(false);
                  }
                }}
              >
                <h2 className="font-Roboto-Medium text-ex text-[#2C2F45]">Device Cosmetic Report</h2>
                <Image src={DropDown} width={20} height={20}  className={`${open ? "transform rotate-180" : ""
                    } w-5 h-5 text-gray-70`}/>
              </div>
            </Disclosure.Button>


            <Disclosure.Panel className="px-1 mt-3 text-sm text-gray-70 divide-y">
              <div className="border-t pt-2">
                {data && data?.cosmetic && (
                  <div>
                    {deviceConditionQuestion.map((item, index) => (
                      <div>
                        <span className="text-dx font-Bold text-[#2C2F45] ">{data?.cosmetic[index] != undefined && item?.title}</span>
                        {data?.cosmetic[index] != undefined &&
                          <ConditionOptionLarge2
                            title={data?.cosmetic[index]}
                            options={data?.cosmetic[index] && item?.options}
                            conditionResults={data?.cosmetic}
                            questionIndex={index}
                          />}
                      </div>

                    ))}
                  </div>
                )}
              </div>

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
        src={testStatus === "PASS" ? "https://d1tl44nezj10jx.cloudfront.net/assets/check2-circle.svg" : "https://d1tl44nezj10jx.cloudfront.net/web/assets/testFail.svg"}
        alt={`${index}.${question}`}
      />
    </p>
  </div>
);

const Results = ({ question, result, childQuestions, index }) => {
  return (
    <div className="w-full py-1 ">
      <p>
        {index}.{question}
      </p>
      <div>
        {childQuestions && childQuestions?.length > 0 ? (
          childQuestions.map((items, index1) => (
            <div key={index1} className="flex items-start pt-2">
              <img src="https://d1tl44nezj10jx.cloudfront.net/web/assets/pass1.svg" className="mt-1 mr-2" />
              <p>{items}</p>
            </div>
          ))
        ) : (
          <div className="flex items-start pt-2">
            <img src="https://d1tl44nezj10jx.cloudfront.net/web/assets/pass1.svg" className="mt-1 mr-2" />
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};
