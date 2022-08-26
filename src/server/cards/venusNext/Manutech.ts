import {ICorporationCard} from '../corporation/ICorporationCard';
import {Player} from '../../Player';
import {Tag} from '../../../common/cards/Tag';
import {Resources} from '../../../common/Resources';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Units} from '../../../common/Units';

export class Manutech extends Card implements ICorporationCard {
  public migrated = true;
  constructor() {
    super({
      name: CardName.MANUTECH,
      tags: [Tag.BUILDING],
      startingMegaCredits: 35,
      cardType: CardType.CORPORATION,
      productionBox: Units.of({steel: 1}),

      metadata: {
        cardNumber: 'R23',
        description: 'You start with 1 steel production, and 35 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.steel(1)).nbsp.megacredits(35);
          b.corpBox('effect', (ce) => {
            ce.effect('For each step you increase the production of a resource, including this, you also gain that resource.', (eb) => {
              eb.production((pb) => pb.wild(1)).startEffect.wild(1);
            });
          });
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public static onProductionGain(player: Player, resource: Resources, amount: number) {
    if (amount > 0) {
      player.addResource(resource, amount);
    }
  }
}