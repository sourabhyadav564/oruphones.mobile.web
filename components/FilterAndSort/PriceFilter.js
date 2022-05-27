import { Fragment } from "react";
import { useEffect, useState } from "react";

function PriceFilter({setSelectedValues, router,seletedValues}) {
    const {min,max} = router.query;
    const [minPrice,setMinPrice] = useState(seletedValues?.priceRange?.min||"");
    const [maxPrice,setMaxPrice] = useState(seletedValues?.priceRange?.max||"");

    useEffect(() => {
        setSelectedValues(prev=>({...prev,priceRange:{min:minPrice,max:maxPrice}}))
    }, [minPrice,maxPrice])

    function handleChange(e){
        const {name,value} = e.target;
        if(name === "min"){
            setMinPrice(value);
        }else if(name === "max"){
            setMaxPrice(value);
        }
    }

  return (
    <Fragment>
      <p className="text-base">Price</p>
      <div className="text-xs flex space-x-2 mt-2 mb-4">
        <label>
          Min{" "}
          <input name="min" placeholder={min} value={minPrice||""} disabled={min === undefined ?false:true} type="number" className="border rounded-md p-2 ml-2 w-24 border-gray-c7" onChange={handleChange}/>
        </label>
        <label>
          Max{" "}
          <input name="max" placeholder={max} value={maxPrice||""} disabled={min === undefined ?(!minPrice || minPrice < 0):true} min={minPrice+1} type="number" className="border rounded-md p-2 ml-2 w-24 border-gray-c7" onChange={handleChange}/>
        </label>
      </div>
    </Fragment>
  );
}

export default PriceFilter;
