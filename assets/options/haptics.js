import * as Haptics from "expo-haptics";

export const haptic = (option, cadence) => {
    if (option==='singlebeat') {
        return ()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else if (option==='heartbeat') {
        return ()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 45000/cadence)
        };
    } else if (option==='triplet') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 30000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 45000/cadence)
        }
    } else if (option==='doubletime') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 30000/cadence)
        }
    } else if (option==='tripletime') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 20000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 40000/cadence)
        }
    } else if (option==='quadrupletime') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 15000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 30000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 45000/cadence)
        }
    }
}

export const hapticOnce = (option, cadence=100) => {
    if (option==='singlebeat') {
        return ()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else if (option==='heartbeat') {
        return ()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 15000/cadence)
        };
    } else if (option==='triplet') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 15000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 30000/cadence)
        }
    } else if (option==='doubletime') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 30000/cadence)
        }
    } else if (option==='tripletime') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 20000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 40000/cadence)
        }
    } else if (option==='quadrupletime') {
        return () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 15000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 30000/cadence)
            setTimeout(()=> Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 45000/cadence)
        }
    }
}