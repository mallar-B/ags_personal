const mpris = await Service.import("mpris")

const label = Utils.watch("", mpris, "player-changed", () => {
    if (mpris.players[0]) {
        const { track_artists, track_title } = mpris.players[0]
        return `${track_artists.join(", ")} - ${track_title}`
    } else {
        return "Nothing is playing"
    }
})

export const Media = () => Widget.Box({
        class_name: "media-box",
        child: Widget.Button({
            class_name: "media-button",
            on_primary_click: () => mpris.getPlayer("")?.playPause(),
            on_scroll_up: () => mpris.getPlayer("")?.next(),
            on_scroll_down: () => mpris.getPlayer("")?.previous(),
            child: Widget.Label({
                label: label,
                truncate: "end",
                maxWidthChars: 30,
            }),
        }),
    })