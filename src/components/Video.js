import video from '../PyMolmovie.mp4'; 

//Deleted this because it covered the video: <h2 style={{ textAlign: "center" }}>Video Example</h2>

export default function Video () {
    return (
        <div className="video-container">
        <video background-color="transparent" width="100%" height="100%" autoPlay loop muted>
            <source src={video} type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
        </div>
    );
}   
