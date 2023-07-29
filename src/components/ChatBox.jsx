const ChatBox = ({ color, img, bg, title, subtitle, key }) => {
  return (
    <div
      key={key}
      className={`outline outline-${color} bg-${bg} rounded-2xl p-8 max-sm:p-4 `}
    >
      <div className="max-sm:flex max-sm:items-center">
        <img src={img} alt={title} className="mb-3 max-sm:mb-0 w-12" />
        <h3 className="font-semibold mb-2 max-sm:mb-0 max-sm:ml-4 text-[#e9f1df]">
          {title}
        </h3>
        <p className="max-md:hidden text-sm text-[#e9f1df]">{subtitle}</p>
      </div>
    </div>
  );
};

export default ChatBox;
