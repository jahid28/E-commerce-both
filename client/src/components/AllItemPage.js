import React, { useEffect, useState, CSSProperties, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import ItemCard from "./ItemCard.js";
import { useNavigate, useLocation } from "react-router-dom";
// impor useNavigate
// useRef
export default function AllItemPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstRender = useRef(true); // Ref to track initial render

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);

  const searchParams1 = new URLSearchParams(location.search);
  

  // useEffect(() => {
  //   // console.log("yess");
  //   // console.log(searchParams1.get("pageNum"));
  //   if (searchParams1.get("selectedOption")!=null) {
  //     setSelectedOption(searchParams1.get("selectedOption"));
  //     setPageNum(parseInt(searchParams1.get("pageNum"), 10));
  //   }
  // }, []);

  // const URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000'

  const typeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const typeChangeSubmit = async (e) => {
    setProgress(20);
    setLoading(true);

    try {
        // navigate(`/?selectedOption=${selectedOption}&pageNum=${pageNum}`);

      // await axios
      //   .post(`${process.env.REACT_APP_SERVER_URL}/getProducts?selectedOption=${selectedOption}`)
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/getProducts`,{
          selectedOption
        })
        .then((res) => {
          if (res.data == "fail") {
            toast.error("Somethig went wrong!");
          } else {
            setProgress(50);
            const x = res.data;
            setData(x.allProducts);
            setTotalPages(Math.ceil(x.totalItems / 12));
            setPageNum(1);
            setProgress(100);
          }
          setLoading(false);
        })
        .catch((e) => {
          toast.error("Somethig went wrong!");
        });
    } catch (e) {
      toast.error("Somethig went wrong!");
    }
  };

  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return;
    // }
    typeChangeSubmit();
  }, [selectedOption]);

  const pageChangeSubmit = async (e) => {
    setProgress(20);
    setLoading(true);

    try {
        // if(pageNum<1){
        //     toast.error("Somethig went wrong!");
        //     return
        // }
      // console.log("num is ", pageNum);
      // navigate(`/?selectedOption=${selectedOption}&pageNum=${pageNum}`);

   
      // await axios
      //   .post(
      //     `${process.env.REACT_APP_SERVER_URL}/pageChange?selectedOption=${selectedOption}&pageNum=${pageNum}`
      //   )
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/pageChange`,{
            selectedOption,pageNum
          }
        )
        .then((res) => {
          // console.log("doneeeee")
          // console.log(res.data)
          setProgress(50);
          setData(res.data);
          setProgress(100);
          setLoading(false);
        })
        .catch((e) => {
          toast.error("Somethig went wrong!");
        });
    } catch (e) {
      // console.log("howww", e);
      toast.error("Somethig went wrong!");
    }
  };

  const prev = () => {
    setPageNum(pageNum - 1);
  };
  const next = () => {
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    pageChangeSubmit();
  }, [pageNum]);

  return data.length > 0 ? (
    <div>
      <LoadingBar
        color="red"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <h2 className="font-bold text-base my-2 ml-3 lg:text-3xl lg:my-4">
        Search by Categories :{" "}
      </h2>
      <select
        className="border border-black rounded mb-2 ml-3 lg:text-xl"
        value={selectedOption}
        onChange={typeChange}
      >
        <option>All</option>
        <option>Neck-sets</option>
        <option>Earrings</option>
        <option>Bangles-Bracelets</option>
        <option>Bridal collection</option>
        {/* <option>Kitchen</option> */}
      </select>

      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-12 mx-auto  ">
          <div className="flex flex-wrap -m-4  ">
            {data.map((item) => (
              <div
                className="lg:w-1/4 md:w-1/2 p-2 scale-95 my-4 w-full  rounded-lg shadow-md cursor-pointer hover:shadow-2xl"
                key={item._id}
              >
                <ItemCard
                  name={item.name}
                  type={item.type}
                  price={item.price}
                  stocks={item.stocks}
                  img={item.img}
                  allRatings={item.allRatings}
                  reviews={item.reviews}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="buttons" class="flex justify-center mb-10 items-center">
        <button
          disabled={pageNum <= 1 ? true : false}
          onClick={prev}
          class="mr-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Previous
        </button>
        <p>
          Page : {pageNum}/{totalPages}
        </p>
        <button
          disabled={pageNum >= totalPages ? true : false}
          onClick={next}
          class="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center w-full">
      <PulseLoader
        color="rgb(74, 87, 224)"
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
