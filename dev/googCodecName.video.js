getStatsParser.checkVideoTracks = function(result) {
    if (result.googCodecName !== 'VP8' && result.googCodecName !== 'VP9') return;
    // googCurrentDelayMs, googRenderDelayMs, googTargetDelayMs
    // transportId === 'Channel-audio-1'
    var sendrecvType = result.id.split('_').pop();

    if (!!result.bytesSent) {
        var kilobytes = 0;
        if (!getStatsResult.internal.video[sendrecvType].prevBytesSent) {
            getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent;
        }

        var bytes = result.bytesSent - getStatsResult.internal.video[sendrecvType].prevBytesSent;
        getStatsResult.internal.video[sendrecvType].prevBytesSent = result.bytesSent;

        kilobytes = bytes / 1024;
    }

    if (!!result.bytesReceived) {
        var kilobytes = 0;
        if (!getStatsResult.internal.video[sendrecvType].prevBytesReceived) {
            getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived;
        }

        var bytes = result.bytesReceived - getStatsResult.internal.video[sendrecvType].prevBytesReceived;
        getStatsResult.internal.video[sendrecvType].prevBytesReceived = result.bytesReceived;

        kilobytes = bytes / 1024;
    }

    getStatsResult.video[sendrecvType].availableBandwidth = kilobytes.toFixed(1);

    if (result.googFrameHeightReceived && result.googFrameWidthReceived) {
        getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthReceived;
        getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightReceived;
    }

    if (result.googFrameHeightSent && result.googFrameWidthSent) {
        getStatsResult.resolutions[sendrecvType].width = result.googFrameWidthSent;
        getStatsResult.resolutions[sendrecvType].height = result.googFrameHeightSent;
    }

    if (getStatsResult.video[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
        getStatsResult.video[sendrecvType].tracks.push(result.googTrackId);
    }
};
