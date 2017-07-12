var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props){
// display (1) the avatar img, (2) the username and (3) the reset button

    return (
        <div>
            <div className='column'>
                <img
                    src={props.avatar}
                    alt={'Avatar for ' + props.username}
                    />
                <h2 className='username'>@{props.username}</h2>
            </div>
            {props.children}
        </div>
    )

}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;
