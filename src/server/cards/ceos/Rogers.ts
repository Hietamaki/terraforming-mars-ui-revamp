import {CardName} from '../../../common/cards/CardName';
import {Player} from '../../Player';
import {PlayerInput} from '../../PlayerInput';
import {CardRenderer} from '../render/CardRenderer';
import {CeoCard} from './CeoCard';

import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {GlobalParameter} from '../../../common/GlobalParameter';
import {played} from '../Options';

export class Rogers extends CeoCard {
  constructor() {
    super({
      name: CardName.ROGERS,
      metadata: {
        cardNumber: 'L18',
        renderData: CardRenderer.builder((b) => {
          b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
          b.br;
          b.venus(1).colon().projectRequirements();
          b.br;
          b.venus(1, {played}).colon().megacredits(-3);
        }),
        description: 'Ignore global requirements for your Venus cards THIS GENERATION. When you play a Venus tag THIS GENERATION, you pay 3 M€ less for it.',
      },
    });
  }

  public opgActionIsActive = false;

  public action(): PlayerInput | undefined {
    this.opgActionIsActive = true;
    this.isDisabled = true;
    return undefined;
  }

  public getRequirementBonus(_player: Player, parameter: GlobalParameter): number {
    if (this.opgActionIsActive === false || parameter !== GlobalParameter.VENUS) return 0;
    // Magic number high enough to always ignore requirements.
    return 50;
  }

  public override getCardDiscount(_player: Player, card: IProjectCard) {
    if (this.opgActionIsActive === false) return 0;
    return card.tags.filter((tag) => tag === Tag.VENUS).length * 3;
  }
}
