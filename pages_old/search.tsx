import CardList from "components/card/CardList";
import LoadingSpinner from "components/common/LoadingSpinner";
import PageHead from "components/common/PageHead";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CardData } from "types/types";
import { SearchResultType } from "./api/getSearchResult";

const SearchPage = () => {
  const { push, query } = useRouter();
  const searchQuery = query.q?.toString() ?? "";

  const [inputValue, setInputValue] = useState("");
  const [postData, setPostData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    push({
      query: {
        q: inputValue,
      },
    });
  };

  useEffect(() => {
    const fetchSearchItems = async () => {
      if (!searchQuery) return;

      setIsLoading(true);

      const response = await fetch(`/api/getSearchResult?q=${searchQuery}`);
      const { data }: SearchResultType = await response.json();

      setPostData(data);

      setIsLoading(false);
    };

    fetchSearchItems();
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <PageHead
        title={searchQuery ? `${searchQuery}에 대한 검색 결과` : ""}
        description={
          searchQuery
            ? `${searchQuery}에 대한  ${postData.length}개의 검색 결과가 있습니다.`
            : ""
        }
      />
      <section className="min-h-screen">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-24 px-4">
          <form className="max-w-3xl mx-auto relative" onSubmit={onSubmit}>
            <input
              className="w-full rounded-md text-xl p-4 outline-none"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="p-4 text-gray-500 hover:text-black absolute right-0 top-1/2 -translate-y-1/2"
              type="submit"
            >
              <AiOutlineSearch size={"1.5rem"} />
            </button>
          </form>
        </div>

        <div>
          <div className="p-8 max-w-5xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <CardList data={postData} />
            )}
            {!isLoading && postData.length === 0 && searchQuery.length ? (
              <div className="text-center">No Results Found</div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
