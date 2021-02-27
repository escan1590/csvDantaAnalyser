const minimalObj = (obj) => {
    return {
        Date_publication : obj.created_at, 
        Auteur : obj.user_name,
        IDauteur : ('@' + obj.user_screen_name),
        Hashtags : obj.hashtags, 
        Lieu : obj.user_location,
        Langue_utilisateur : obj.lang,
        ID: obj.id,
        Url : obj.tweet_url,
        Text : obj.text,
        Media : obj.media,
        Info_auteur : obj.user_description,
        Retweet : obj.retweet_count,
        Like : obj.favorite_count,
        Utilisateur_verifie : obj.user_verified
    }
};

module.exports.minimalObj = minimalObj;