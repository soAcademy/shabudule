import React, { useEffect, useContext } from "react";
import { BranchContext } from "../App";
import { Link } from "react-router-dom";


export const Search = ({
  search,
  setSearch,
  searchDatas,
  setSearchDatas,
  shops,
}) => {
  const { setBranchId } = useContext(BranchContext);
  useEffect(() => {
    const searchDatas = shops?.filter((data) => {
      const hasMatchingShop = String(data?.name)
        ?.toLowerCase()
        .includes(search?.toLowerCase());
      const hasMatchingBranch = data?.shabuShopBranchs?.some((branch) =>
        String(branch?.branchName)
          ?.toLowerCase()
          .includes(search?.toLowerCase())
      );
      return hasMatchingShop || hasMatchingBranch;
    });
    setSearchDatas(searchDatas);
  }, [search]);
  console.log("searchDatas", searchDatas);
  return (
    <>
      <div className="text-center">
        <input
          type="text"
          className="w-4/5 m-auto bg-white rounded-md my-2 text-center"
          placeholder="search here"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search !== undefined && search.length >= 2 && (
        <div className="w-4/5 mx-auto -mt-2.5 pt-2 bg-white rounded-b-md shadow-lg top-0 overflow-auto relative">
          <div className={`w-full top-0 ${searchDatas.length > 5 ? "h-44 overflow-auto" : ""} `}>
            <div>
              {searchDatas?.map((data, index) => (
                <div key={index} className="text-center">
                  <Link
                    to="/shabu/shopBranch"
                    onClick={() => {
                      setBranchId(data.shabuShopBranchs[0].id);
                      console.log("branchId2", data.shabuShopBranchs[0].id);}} //need [0] as it is an array of objects (check console)
                  >
                    {String(data?.name)
                      ?.toLowerCase()
                      .includes(search?.toLowerCase()) && (
                      <div>
                        {data?.shabuShopBranchs?.map((branch, index) => (
                          <div key={index} className="text-center">
                            <div className="text-sm px-1 hover:bg-red-500 hover:text-[#F5F5F5] text-[#B1454A] font-semibold active:bg-[#c95f64] cursor-pointer">
                              {data?.name}: {branch?.branchName}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {
                      <div>
                        {data?.shabuShopBranchs
                          .filter((branch) =>
                            String(branch?.branchName)
                              ?.toLowerCase()
                              .includes(search?.toLowerCase())
                          )
                          .map((branch, index) => (
                            <div
                              key={index}
                              className="px-1 hover:bg-red-500 hover:text-[#F5F5F5] text-[#B1454A] font-bold active:bg-[#c95f64] cursor-pointer"
                            >
                              {data.name}:{branch.branchName}
                            </div>
                          ))}
                      </div>
                    }
                  </Link>
                </div>
              ))}
              {searchDatas
          .filter((data) =>
            String(data?.name)
              ?.toLowerCase()
              .includes(search?.toLowerCase())
          )
          .length === 0 && searchDatas.length === 0 && (
          <div className="text-center font-bold">
            No results found for "{search}".
          </div>
        )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
