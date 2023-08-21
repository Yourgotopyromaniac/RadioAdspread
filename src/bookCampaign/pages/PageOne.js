import React, { useState } from "react";
import "./css/page-one.css";
import BudgetFilter from "../components/BudgetFilter.js";
import RecommendedStation from "../components/RecommendedStation/RecommendedStation";
import Newsletter from "../../components/Newsletter.js";
import MainFooterSect from "../../components/MainFooterSect.js";
import { MyContext } from "../../pages/BookCampaign";

const PageOne = () => {
  const { countrystateinfo, search } = React.useContext(MyContext);

  const [filterLocation, setFilterLocation] = useState("");
  const [budgetPrice, setBudgetPrice] = useState();
  const getSearch = (data) => {
    setFilterLocation(data);
  };
  const priceFilterRange = (data) => {
    setBudgetPrice(data);
  };

  return (
    <div id="book-campaign">
      <main>
        {/* <SearchRadioStation stationLocation={getLocation}/> */}
        <section id="select-station-sect">
          <div>
            <BudgetFilter
              searchState={getSearch}
              priceFilter={priceFilterRange}
            />
            <RecommendedStation
              countrystateobj={countrystateinfo}
              searchState={search}
              location={filterLocation}
              filterByPriceRange={budgetPrice}
            />
          </div>
        </section>
      </main>
      <footer>
        <Newsletter />
        <MainFooterSect />
      </footer>
    </div>
  );
};

export default PageOne;
