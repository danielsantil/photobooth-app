const effects = {
    default: (seriously, src, target) => {
    },
    ascii: (seriously, src, target) => {
        const ascii = seriously.effect('ascii');
        ascii.source = src;
        target.source = ascii;
        seriously.go();
    }
}

function choose(seriously, source, target, effectName = 'default') {
    if (effectName === 'default') {
        target.source = source;
        seriously.go();
        return;
    }

    try {
        let effect = seriously.effect(effectName);
        effect.source = source;
        target.source = effect;
        seriously.go();
    } catch {
        choose(seriously, source, target, 'default');
    }
}

module.exports = {
    choose
}