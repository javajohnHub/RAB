var mongoose = require('mongoose');
var Members = require('../models/members');

module.exports = () => {
    var rp = require('request-promise');
    var url = `https://slack.com/api/users.list?token=${process.env.SLACK_OAUTH_TOKEN}&pretty=1`;
    var options = {
        uri: url,
        json: true
    };
    rp(options)
        .then(function (data) {
            data.members.forEach(function(member) {
                if(member.profile !== undefined) {
                    var profile = member.profile;
                    if(profile.email && profile.email.length > 0) {
                        Members.findOne({'email': profile.email}, function(err, member) {
                            if(err) throw err;
                            else if(!member) {
                                var newMember = new Members();
                                newMember.coach = 'false';
                                newMember.name = profile.real_name;
                                newMember.email = profile.email;
                                newMember.img = profile.image_192;
                                console.log(newMember);
                                
                                newMember.save(function(err, member) {
                                    if(err) throw err;
                                });
                            }
                        });
                    }
                }
            });
        })
        .catch(function (err) {
            console.log('error', err);
        });

}
