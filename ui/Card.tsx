const Card = (props: { children: any; title: string, classes?: string }) => {
  return (
    <div className="bg-white dark:bg-gray-900 pt-0 pb-5 rounded-3xl shadow border border-gray-300 dark:border-gray-700">
      <h2 className="text-3xl font-semibold py-5 px-5 text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-50 rounded-t-3xl text-center border-b border-gray-200 dark:border-gray-700">
        {props.title}
      </h2>
      <div className={`${props.classes}`}>{props.children}</div>
    </div>
  );
};

export default Card;
