import { deviceConditionQuestion } from "@/utils/constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConditionOptionLarge from "../Condition/ConditionOptionLarge";
import Modal1 from "./Modal1";

function ConditionPopup({ openCondition, setopenCondition, setConditionResultEdit, setConditionQuestionEdit }) {
    // console.log("openCondition", setConditionResultEdit());
    const [questionIndex, setQuestionIndex] = useState(0);
    const [conditionResults, setConditionResults] = useState({});
    const [condition, setCondition] = useState("");

    // const [range, setRange] = useState("Featured");

    function handleChange(data) {
        setCondition(data);
    }
    useEffect(() => {
        if(openCondition){const onBackButtonEvent = (e) => {
            e.preventDefault();
            setopenCondition(false);
        }
    
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);  
        };}
    },[openCondition]);
    useEffect(() => {
        setConditionResultEdit(condition);
        setConditionQuestionEdit(conditionResults);
    }, [condition]);

    // const submit = (e) => {
    //     e.preventDefault();
    //     setSortApplyFilter(range);
    //     setOpenSort(false);
    // };
    
    useEffect(() => {
        if (questionIndex === 0) {
            setConditionResults({});
        }
    }, [questionIndex]);

    useEffect(() => {
        if (openCondition) {
            setQuestionIndex(0);
            setConditionResults({});
        }
    }, [openCondition]);


    const calculateDeviceCondition = () => {
        if (conditionResults[0].toString() == "No") {
            handleChange("Needs Repair");
        } else if (
            conditionResults[1].toString().includes("Has significant scratches") ||
            conditionResults[2].toString().includes("Has significant scratches")
        ) {
            handleChange("Fair");

        } else if (
            conditionResults[1].toString().includes("Up to 5") ||
            conditionResults[2].toString().includes("Up to 5")
        ) {
            handleChange("Good");

        } else if (
            conditionResults[1].toString().includes("Up to 2") ||
            conditionResults[2].toString().includes("Up to 2")
        ) {
            handleChange("Excellent");

        } else if (
            conditionResults[1].toString().includes("No scratch") ||
            conditionResults[2].toString().includes("No scratch")
        ) {
            handleChange("Like New");

        } else {
            setCondition("Like New");
        }
    };

    const handleForward = () => {
        questionIndex in conditionResults
            ? setQuestionIndex(
                questionIndex < deviceConditionQuestion.length - 1
                    ? questionIndex + 1
                    : deviceConditionQuestion.length - 1
            )
            : toast.warning("Please select condition", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        if (conditionResults[0].toString() == "No") {
            calculateDeviceCondition();
            setopenCondition(false);
            setQuestionIndex(0);
        }
        else {
            // questionIndex == deviceConditionQuestion.length - 1 &&
            //     calculateDeviceCondition();
            questionIndex == deviceConditionQuestion.length - 1 && calculateDeviceCondition();
            questionIndex == deviceConditionQuestion.length - 1 && setopenCondition(false);
            questionIndex == deviceConditionQuestion.length - 1 && setQuestionIndex(0);
            console.log("condition", condition);
        }
    };

    return (
        <Modal1 open={openCondition} setOpen={setopenCondition}>
            <div className="bg-white p-6 pb-14 sm:p-6 sm:pb-4">
                <div className="text-left sm:mt-0 sm:ml-4 sm:text-left text-black-4e">
                    {/* <Dialog.Title as="h1" className="text-lg leading-6 font-semibold ">
                        Sort by
                    </Dialog.Title> */}
                    <div>
                        <h3 className="text-center font-Roboto-Semibold text-xl">
                            {deviceConditionQuestion[questionIndex]?.title}
                        </h3>
                        {deviceConditionQuestion[questionIndex]?.options?.map(
                            (item, index) => (
                                <div
                                    onClick={() => {
                                        setConditionResults((prev) => {
                                            return {
                                                ...prev,
                                                [questionIndex]: item?.title,
                                            };
                                        });
                                    }}
                                    key={index}
                                >
                                    <ConditionOptionLarge
                                        title={item?.title}
                                        options={item?.options}
                                        conditionResults={conditionResults}
                                        questionIndex={questionIndex}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <button className="uppercase z-50 bg-primary text-white w-full rounded text-sm py-2 my-2" onClick={handleForward}> Next </button>
            </div>
        </Modal1>
    );
}

export default ConditionPopup;

// const Button = ({ children, active, ...rest }) => (
//     <p
//         className={`block rounded-md text-xs border mr-3 my-2 px-4 py-1 ${active ? "bg-primary-light opacity-50 text-white border-primary" : "border-gray-c7"}`}
//         {...rest}
//     >
//         {children}
//     </p>
// );
