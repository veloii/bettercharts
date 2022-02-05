import Badge from "../ui/Badge";

const badges = () => {
  return (
    <div className="flex gap-4 pt-5">
      <Badge image="https://195ec04504ea0272771e-7c2c6dacbab7a2b2d574b53c70c1fe31.ssl.cf3.rackcdn.com/22.1.0/img/eventbadgeicons/bronze/17.svg" text="Bronze House Point Award" />
      <Badge image="https://195ec04504ea0272771e-7c2c6dacbab7a2b2d574b53c70c1fe31.ssl.cf3.rackcdn.com/22.1.0/img/eventbadgeicons/silver/17.svg" text="Silver House Point Award" />
    </div>
  );
};

export default badges;
