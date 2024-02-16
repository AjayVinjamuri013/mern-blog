import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {formatISO9075} from "date-fns";

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
    //this is used to get id of the post from the url (I guess!)
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
          .then(response =>  {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            });
          });
    }, []);

    if(!postInfo) return '';
    return (
        <div className="post-page">
          <h1>{postInfo.title}</h1>
          <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
          <div className="author"> by {postInfo.author.username}</div>
          <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt=''/>
          </div>
          {/*content is present in the form of html. which is why we are setting inner html*/}
          <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
}