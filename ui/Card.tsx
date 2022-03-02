const Card = (props: { children: any; title: string; classes?: string }) => {
  return (
    <div className="pb-4 bg-white border border-gray-300 dark:bg-gray-900 rounded-3xl dark:border-gray-700">
      <h2 className="px-6 py-4 text-lg font-semibold text-gray-900 border-b dark:text-gray-50 bg-gray-50 dark:bg-gray-800 dark:border-b-gray-800 rounded-t-3xl">
        {props.title}
      </h2>
      <div className={`${props.classes}`}>{props.children}</div>
    </div>
  );
};

export default Card;
