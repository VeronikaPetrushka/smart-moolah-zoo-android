import Moolahbckgrhandler from "./Moolahbckgrhandler";
import smartcmpntszoo from "../smartimprtszoo/smartcmpntszoo";

export const Smartaddanimalscrn = ({ route }) => {
    const { animal } = route.params || {};

    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartaddanimal animal={animal} />}
        />
    )
};

export const Smartaddenclosurescrn = ({ route }) => {
    const { enclosure } = route.params || {};

    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartaddenclosure enclosure={enclosure} />}
        />
    )
};

export const Smartaddfeedscrn = ({ route }) => {
    const { feed } = route.params || {};

    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartaddfeed feed={feed} />}
        />
    )
};

export const Smartaddplanscrn = ({ route }) => {
    const { plan } = route.params || {};

    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartaddplan plan={plan} />}
        />
    )
};

export const Smartaddvisitorsscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartaddvisitors />}
        />
    )
};

export const Smartanimalinfoscrn = ({ route }) => {
    const { item, type } = route.params;

    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartanimalinfo item={item} type={type} />}
        />
    )
};

export const Smartfeedinfoscrn = ({ route }) => {
    const { feed } = route.params || {};

    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartfeedinfo feed={feed} />}
        />
    )
};

export const Smarthistoryzooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smarthistoryzoo />}
        />
    )
};

export const Smarthomezooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smarthomezoo />}
            isNav
        />
    )
};

export const Smartmiddlezooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartmiddlezoo />}
        />
    )
};

export const Smartplaninfoscrn = ({ route }) => {
    const { plan } = route.params || {};

    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartplaninfo plan={plan} />}
        />
    )
};

export const Smartplanzooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartplanzoo />}
            isNav
        />
    )
};

export const Smartsettingszooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartsettingszoo />}
            isNav
        />
    )
};

export const Smartsplashzooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartsplashzoo />}
        />
    )
};

export const Smartstatisticszooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smartstatisticszoo />}
            isNav
        />
    )
};

export const Smarttestzooscrn = () => {
    return (
        <Moolahbckgrhandler
            child={<smartcmpntszoo.Smarttestzoo />}
        />
    )
};