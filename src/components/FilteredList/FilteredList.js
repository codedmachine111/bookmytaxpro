import "./FilteredList.scss";
import { ExpertCard } from "../ExpertCard/ExpertCard";

export const FilteredList = (props) => {
  const { listOfExperts } = props;

  return (
    <>
      <div className="filtered-list-container">
        <div className="filtered-list">
          {listOfExperts.map((expert, key) => {
            return (
              <>
                <ExpertCard
                  key={key}
                  name={expert.name}
                  services={expert.services}
                  rating={expert.rating}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
