function parseTwitterDate(tdate: string) {
  const systemDate = new Date(Date.parse(tdate));
  const userDate = new Date();
  const diff = Math.floor((userDate.getTime() - systemDate.getTime()) / 1000);
  if (diff <= 1) {
    return "just now";
  }
  if (diff < 20) {
    return diff + " seconds ago";
  }
  if (diff < 40) {
    return "half a minute ago";
  }
  if (diff < 60) {
    return "less than a minute ago";
  }
  if (diff <= 90) {
    return "one minute ago";
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + " minutes ago";
  }
  if (diff <= 5400) {
    return "1 hour ago";
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + " hours ago";
  }
  if (diff <= 129600) {
    return "1 day ago";
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + " days ago";
  }
  if (diff <= 777600) {
    return "1 week ago";
  }
  return (
    "on " +
    systemDate.toLocaleDateString() +
    " " +
    systemDate.toLocaleTimeString()
  );
}

const Badge = (props: { image: string; text: string; dateCreated: string }) => {
  return (
    <div className="w-40 bg-white dark:bg-gray-900 p-2 rounded-lg border dark:border-gray-700">
      <img className="w-full" src={props.image} />
      <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-100">
        {props.text}
      </p>
      <p className="text-center text-xs font-light text-gray-600 dark:text-gray-300">
        {parseTwitterDate(props.dateCreated)}
      </p>
    </div>
  );
};

export default Badge;
