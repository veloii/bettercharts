const Badge = (props: { image: string; text: string }) => {
  return (
    <div className="w-36 bg-white p-2 rounded-lg border">
      <img className="w-full" src={props.image} />
      <p className="text-center font-medium text-gray-800">{props.text}</p>
    </div>
  );
};

export default Badge;
