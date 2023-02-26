/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import "./Error.css";

/**
 * @description Function rendering error message
 */
function Error () {
    return (
        <section className='error-page'>
            <p>Erreur 404 <br/> Aucune donnée correspondant à la recherche n'a été trouvée</p>
        </section>
    );
}

export default Error;