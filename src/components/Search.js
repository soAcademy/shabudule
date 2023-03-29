import React, { useEffect } from "react";

export const Search = ({
  search,
  setSearch,
  searchDatas,
  setSearchDatas,
  shops,
}) => {
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
  return (
    <>
      <div className="text-center">
        <input
          type="text"
          className="w-1/2 m-auto bg-neutral-200 rounded-lg my-2 text-center"
          placeholder="search here"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search !== undefined && search.length >= 2 && (
        <div className="w-2/4 mx-auto bg-white shadow-lg top-0 overflow-auto relative">
          <div className="w-full h-44 top-0">
            <div>
              {searchDatas?.map((data, index) => (
                <div key={index} className="text-center">
                  {String(data?.name)
                    ?.toLowerCase()
                    .includes(search?.toLowerCase()) && (
                    <div>
                      {data?.shabuShopBranchs?.map((branch, index) => (
                        <div key={index} className="text-center">
                          <div className="px-1 hover:bg-red-500 hover:text-[#F5F5F5] text-[#B1454A] font-bold active:bg-[#c95f64] cursor-pointer">
                            {data?.name}: {branch?.branchName}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {
                    <div >
                      {data?.shabuShopBranchs
                        .filter((branch) =>
                          String(branch?.branchName)
                            ?.toLowerCase()
                            .includes(search?.toLowerCase())
                        )
                        .map((branch, index) => (
                          <div key={index} className="px-1 hover:bg-red-500 hover:text-[#F5F5F5] text-[#B1454A] font-bold active:bg-[#c95f64] cursor-pointer">
                            {data.name}: {branch.branchName}
                          </div>
                        ))}
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
