import { add } from "./array-math";
import { BASE_CLASS_LIST, CLASS_GROWTHS_RAW, CLASS_STATS_RAW, LVL_40_EXCEPTIONS, PROMOTED_CLASS_LIST } from "./raw-data";

export function isBaseClass(cls: string): boolean {
    return -1 < BASE_CLASS_LIST.findIndex(_cls => _cls == cls);
}

export function isPromotedClass(cls: string): boolean {
    return -1 < PROMOTED_CLASS_LIST.findIndex(_cls => _cls == cls);
}

export function isExceptionClass(cls: string): boolean {
    return -1 < LVL_40_EXCEPTIONS.findIndex(_cls => _cls == cls);
}

export function getBaseClass(promoCls: string): string {
    switch (promoCls) {
        case "Divine Dragon": return "Dragon Child";
        case "Avenir": return "Noble (Alfred)";
        case "Vidame": return "Noble (Céline)";
        case "Successeur": return "Lord (Diamant)";
        case "Tireur d’élite": return "Lord (Alcryst)";
        case "Lindwurm": return "Wing Tamer (Ivy)";
        case "Sleipnir Rider": return "Wing Tamer (Hort.)";
        case "Picket": return "Sentinel (Timerra)";
        case "Cupido": return "Sentinel (Fogado)";

        case "Swordmaster": 
        case "Hero":
            return "Sword Fighter";
        
        case "Halberdier":
        case "Royal Knight":
            return "Lance Figher";

        case "Berserker":
        case "Warrior":
            return "Axe Fighter";

        case "Sniper":
        case "Bow Knight":
            return "Archer";

        case "General":
        case "Great Knight":
            return "Armor";

        case "Paladin":
        case "Wolf Knight":
            return "Cavalier";

        case "Sage":
        case "Mage Knight":
            return "Mage";

        case "Martial Master":
        case "High Priest":
            return "Martial Monk";

        case "Griffin Knight":
        case "Wyvern Knight":
            return "Flier";

        default: throw Error(`Unkown class: ${promoCls}`);
    }
}

export function calcClassPath(startingClass: string, startingLevel: number, targetClass: string, targetLevel: number, promoFirst: boolean): [string, number][] {
    console.log('calcClassPath', ...arguments);
    let path: [string, number][] = [];
    if (startingClass == targetClass) {
        console.log('same class');
        path.push([startingClass, targetLevel - startingLevel]);
    }
    else if (isBaseClass(targetClass)) {
        console.log('is base class');
        if (isExceptionClass(targetClass) && isPromotedClass(startingClass)) {
            path.push([targetClass, targetLevel - 21]);
        } else {
            path.push([targetClass, targetLevel - 1]);
        }
    }
    else { // isPromotedClass(targtClass) <- implicit true
        console.log('is promo class');
        if (promoFirst) {
            // use master seal to get to promo level first
            if (isExceptionClass(startingClass) && startingLevel < 21) {
                path.push([startingClass, 21 - startingLevel]);
            }
            else if (isBaseClass(startingClass) && startingLevel < 10) {
                path.push([startingClass, 10 - startingLevel]);
            }
        } else {
            // use second seal to go to base class first
            if (isExceptionClass(startingClass) && startingLevel < 21 || 
                isBaseClass(startingClass) && startingLevel < 10) {
                
                let targetBase = getBaseClass(targetClass);
                if (targetBase == startingClass) {
                    path.push([startingClass, 10 - startingLevel]);
                } else {
                    path.push([targetBase, 9]);
                }
                
            }
        }

        if (targetLevel > 1) {
            path.push([targetClass, targetLevel - 1])
        }
    }
    console.log(path);
    return path;
}

export function addClassBases(unitStats: number[], cls: string): number[] {
    return add(unitStats, CLASS_STATS_RAW[cls]);
}

export function addClassGrowths(unitGrowths: number[], cls: string): number[] {
    return add(unitGrowths, CLASS_GROWTHS_RAW[cls]);
}

export function convertGrowthsToPercentage(growths: number[]): number[] {
    return growths.map( v => v / 100 );
}

export function applyClassGrowths(growths: number[], cls: string): number[] {
    return convertGrowthsToPercentage(addClassGrowths(growths, cls));
}

export function applyClassGrowths2x(growths: number[], cls: string): number[] {
    return convertGrowthsToPercentage(addClassGrowths(addClassGrowths(growths, cls), cls));
}

export function gainLevels(stats: number[], growths: number[], levels: number): number[] {
    return stats.map((stat, i) => stat + growths[i] * levels);
}

export function applyStarsphere(growths: number[]): number[] {
    return growths.map( val => val + .15 );
}