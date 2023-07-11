
import { Card } from './Types/CardInterfaces';


function PlayingCard({ code, image, value, suit }: Card): JSX.Element {

    return (
      <div className="playing-card" key={code}>
        <img className="card-image" alt={`the ${value} of ${suit}`} src={image}></img>
        <h2 className="card-header">
          {value} of {suit}
        </h2>
      </div>
    );
}

export default PlayingCard;
