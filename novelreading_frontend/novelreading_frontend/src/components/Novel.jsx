const Novel = ({ novel_image, novel_name }) => {
  return (
    <div className="novel-component">
      <img src={novel_image} width="100%" height="80%"></img>
      <p className="story-name">{novel_name}</p>
    </div>
  );
};

export default Novel;
