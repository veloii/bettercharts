const Card = (props: { children: any; title: string; classes?: string }) => {
  return (
    <div className="pt-0 pb-5 bg-white border border-gray-300 shadow dark:bg-gray-900 rounded-3xl dark:border-gray-700">
      <h2 className="px-5 py-5 text-3xl font-semibold text-center text-gray-900 border-b border-gray-200 bg-gray-50 dark:bg-gray-900 dark:text-gray-50 rounded-t-3xl dark:border-gray-700">
        {props.title}
      </h2>
      <div className={`${props.classes}`}>{props.children}</div>
    </div>
  );
};

export default Card;
