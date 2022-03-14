const Seperator = (props: { className: string }) => {
  return (
    <div
      className={"border my-auto dark:border-gray-700 " + props.className}
    ></div>
  );
};

export default Seperator;
