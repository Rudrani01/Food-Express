import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, onToggle }) => {
  // Safety check - if no data, return null
  if (!data) return null;

    return (
    <div className="w-full sm:w-10/12 lg:w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-3 sm:p-4">
      <div
        className="flex justify-between cursor-pointer items-center"
        onClick={onToggle}  // ust notify parent, don't decide anything
      >
        <span className="font-bold text-base sm:text-lg">
          {data?.title} ({data?.itemCards?.length || data?.categories?.length || 0})
        </span>
        <span className="text-lg sm:text-xl flex-shrink-0 ml-2">{showItems ? "⬆️" : "⬇️"}</span>
      </div>

      {/* Parent controls if this shows via showItems prop */}
      {showItems && (
        <>
          {/* Handle nested categories */}
          {data?.categories ? (
            data.categories.map((subCategory, subIndex) => {
              const itemCards = subCategory?.itemCards || [];
              return (
                <div key={subIndex} className="my-2">
                  <h4 className="font-semibold text-left">{subCategory?.title}</h4>
                  <ItemList items={itemCards} />
                </div>
              );
            })
          ) : (
            /* Handle regular categories with direct items */
            <ItemList items={data?.itemCards || []} />
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantCategory;