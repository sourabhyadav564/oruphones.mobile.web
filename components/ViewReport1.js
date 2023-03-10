import { Disclosure } from "@headlessui/react";
import DropDown from "@/assets/arrow-drop-down.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import GCheck from "@/assets/gcheck.svg";
import Close from "@/assets/close.svg";


function ViewReport({ data, defaultOpen, setDefaultOpen }) {
  if (!data?.verified && !data?.cosmetic) {
    return null;
  }

  const [questionIndex, setQuestionIndex] = useState(0);

  // console.log("data", data?.cosmetic);

  return (
    <div className="w-full rounded-md  p-4 mb-4 bg-[#F9F9F9] ">
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
                <h2 className="font-Roboto-Medium  text-ex text-[#2C2F45] ">Device Report (ORUPhones)</h2>


                 <Image src={DropDown} width={20} height={20}  className={`${open ? "transform rotate-180" : ""
                    } w-5 h-5 text-gray-70`}/>

              </div>
            </Disclosure.Button>



            <Disclosure.Panel>
              {data?.verified && (
                <div className="border-t pt-2">

                  <div className="pt-2">
                    <div>
                      <p className="font-Medium text-mx pb-2">Device Verification Report</p>
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
    <p className="font-Regular text-jx"> {testName} </p>
    <p className="flex items-center justify-between capitalize">
      <span className="text-jx font-Regular capitalize pr-2"> {testStatus} </span>
      {/* <Image
        width={25}
        height={23}
        objectFit="contain"
        src={testStatus === "PASS" ? <BsCheckCircle/> : failedIcon}
      /> */}
      {
        testStatus === "PASS" ?<Image src={GCheck} width={14} height={14}/> :   <Image src={Close} width={14} height={14}/>
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
              <img src="https://d1tl44nezj10jx.cloudfront.net/web/assets/pass1.svg" className="mt-1 mr-2" alt={items}/>
              <p>{items}</p>
            </div>
          ))
        ) : (
          <div className="flex items-start pt-2">
            <img src="https://d1tl44nezj10jx.cloudfront.net/web/assets/pass1.svg" className="mt-1 mr-2" alt={result} />
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};
