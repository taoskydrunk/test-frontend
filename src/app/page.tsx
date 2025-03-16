"use client";
import Image from "next/image";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

import { HttpRequest } from "../../services/api.service";

export default function Home() {
  const [today, setToday] = useState<string>("");
  const [comments, setComments] = useState<[]>([]);

  const loadData = () => {
    const now = dayjs();
    setToday(now.format("2018-04-13 19:18"));
  };

  const service = new HttpRequest();

  const getComments = async () => {
    const result = await service.GetComments();
    if (result.data != undefined) {
      setComments(result.data);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputValue = e.target.elements[0].value;
    service.InsertComment(inputValue, "Blend 285");
    setTimeout(() => {
      getComments();
    }, 1000);
    e.target.elements[0].value = "";
  };

  useEffect(() => {
    loadData();
    getComments();
  }, [today]);

  return (
    <div className="h-screen flex justify-center mt-10">
      <div className="flex flex-col">
        <div className="m-2">
          <div className="flex items-center">
            <Image
              className="w-10 h-10 rounded-full mr-4"
              src="https://cdn.mos.cms.futurecdn.net/zRramSvTqiZDNp9roc4MYg-650-80.jpg.webp"
              alt="Lotso"
              width={40}
              height={40}
            />
            <div className="text-sm ">
              <p className="text-gray-900 leading-none">Lostso Bear</p>
              <p className="text-gray-600">{today}</p>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="mr-4"
            src="https://cdn.royalcanin-weshare-online.io/HiJiPmYBaxEApS7LmAfe/v1/ed7a-how-to-buy-a-puppy-article-dog"
            alt="Dog"
            width={500}
            height={500}
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <Image
              className="w-10 h-10 rounded-full mr-4"
              src="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
              alt="Lotso"
              width={40}
              height={40}
            />
            <div className="text-sm w-full mr-4">
              <p className="text-gray-900 leading-none">Blend 285</p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col-reverse relative focus group"
              >
                <input
                  className="w-full font-bold mt-2 focus:outline-none h-10 border rounded px-4 bg-gray-50"
                  type="text"
                  placeholder="Comment"
                />
              </form>
            </div>
          </div>
        </div>
        {comments.map((cm: any, index) => {
          return (
            <div className="mt-4">
              <div className="flex items-center">
                <Image
                  className="w-10 h-10 rounded-full mr-4"
                  src="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
                  alt="Lotso"
                  width={40}
                  height={40}
                />

                <div className="text-sm ">
                  <p className="text-gray-900 leading-none">{cm.created_by}</p>
                  <p className="text-gray-600">{cm.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
