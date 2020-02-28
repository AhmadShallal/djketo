// External Files:
// https://api.html5media.info/1.1.8/html5media.min.js (enables <video> and <audio> tags in all major browsers)
// https://cdn.plyr.io/2.0.13/plyr.js


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/playlist_20160215/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "A Thousand Miles.mp3",
                "length": "4:04",
                "file": "A Thousand Miles"
            }, {
                "track": 2,
                "name": "Beautiful_Goodbye__(vkcomrecoverymusic)_-_Maroon_5_(mp3.vc).mp3",
                "length": "4:15",
                "file": "Beautiful_Goodbye__(vkcomrecoverymusic)_-_Maroon_5_(mp3.vc)"
            }, {
                "track": 3,
                "name": "Cheerleader.mp3",
                "length": "2:59",
                "file": "Cheerleader"
            }, {
                "track": 4,
                "name": "Dazed and Confused.mp3",
                "length": "3:04",
                "file": "Dazed and Confused"
            }, {
                "track": 5,
                "name": "Dear Future Husband.mp3",
                "length": "3:04",
                "file": "Dear Future Husband"
            }, {
                "track": 6,
                "name": "Geronimo",
                "length": "3:38",
                "file": "Geronimo"
            }, {
                "track": 7,
                "name": "Here's To Never Growing Up.mp3",
                "length": "3:34",
                "file": "Here's To Never Growing Up"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function() {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function() {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function() {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function() {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function() {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function() {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function(id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function(id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

//initialize plyr
plyr.setup($('#audio1'), {});