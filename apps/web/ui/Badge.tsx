const Badge = (props: { image: string; text: string; dateCreated: string }) => {
  return (
    <div className="w-40 p-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <img className="w-full" src={props.image} />
      <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
        {props.text}
      </p>
    </div>
  );
};

export default Badge;
