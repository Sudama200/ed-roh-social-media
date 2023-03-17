import User from "../models/User.js";


export const getUser = async (req, res) =>{

    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        req.status(404).json({error: error.message})
    }
}

export const getUserFriends = async (req, res) =>{

    try {
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map(friend => User.findById(friend))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, email, occupation, location, picturePath}) => {
                return{_id, firstName, lastName, email, occupation, location, picturePath }
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        req.status(404).json({error: error.message})

    }
}

export const addRemoveFriend = async (req, res) =>{

    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if(user.friends.includes(friendId)) {
            user.friends= user.friends.filter(friend => friend !== friendId)
            friend.friends= friend.friends.filter(frnd => frnd !== id)
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(friend => User.findById(friend))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, email, occupation, location, picturePath}) => {
                return{_id, firstName, lastName, email, occupation, location, picturePath }
            }
        );
        res.status(200).json({formattedFriends})
    } catch (error) {
        req.status(404).json({error: error.message})
        
    }
}