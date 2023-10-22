import { Construct } from 'constructs';
import { capitalizePropertyNames } from './util';

/**
 * Determines whether the actions that you specify are denied or allowed on the resource(s) that you specify.
 */
export type Effect = 'Allow' | 'Deny';

/**
 * Specifies the update actions that are denied or allowed.
 */
export type ActionValue = 'Update:Modify' | 'Update:Replace' | 'Update:Delete' | 'Update:*';

/**
 * Specifies the update actions that are denied or allowed.
 */
export type Action = ActionValue[] | ActionValue;

/**
 * Specifies the resource type that the condition applies to.
 */
export interface ConditionResourceType {
  /**
   * Specifies the resource types that the condition applies to.
   */
  readonly resourceType: string[]
}

/**
 * You can specify a resource type, such as all EC2 and RDS DB instances.
 */
export interface StringEqualsCondition {
  /**
   * Specifies the resource types that the condition applies to.
   */
  readonly stringEquals: ConditionResourceType
}

/**
 * You can specify a resource type, such as all EC2 and RDS DB instances.
 */
export interface StringLikeCondition {
  /**
   * You must use the StringLike condition when you use wild cards.
   */
  readonly stringLike: ConditionResourceType
}

/**
 * You can specify a resource type, such as all EC2 and RDS DB instances.
 */
export type Condition = StringEqualsCondition | StringLikeCondition;

/**
 * This element is required but supports only the wild card.
 */
export type Principal = '*';

/**
 * You define a stack policy with five elements: Effect, Action, Principal, Resource, and Condition.
 */
export interface ActionResourceStatement {
  /**
   * Determines whether the actions that you specify are denied or allowed on the resource(s) that you specify.
   */
  readonly effect: Effect;

  /**
   * Specifies the update actions that are denied or allowed.
   */
  readonly action: Action;

  /**
   * This element is required but supports only the wild card.
   */
  readonly principal: Principal;

  /**
   * Specifies the logical IDs of the resources that the policy applies to.
   */
  readonly resource: string[] | string;

  /**
   * Specifies the resource type that the policy applies to.
   *
   * @default - No Condition
   */
  readonly condition?: Condition;
}

/**
 * You define a stack policy with five elements: Effect, Action, Principal, Resource, and Condition.
 */
export interface ActionNotResourceStatement {
  /**
   * Determines whether the actions that you specify are denied or allowed on the resource(s) that you specify.
   */
  readonly effect: Effect;

  /**
   * Specifies the update actions that are denied or allowed.
   */
  readonly action: Action;

  /**
   * This element is required but supports only the wild card.
   */
  readonly principal: Principal;

  /**
   * To allow updates to all resources except for one, use a NotResource
   */
  readonly notResource: string;

  /**
   * Specifies the resource type that the policy applies to.
   *
   * @default - No Condition
   */
  readonly condition?: Condition;
}

/**
 * You define a stack policy with five elements: Effect, Action, Principal, Resource, and Condition.
 */
export interface NotActionResourceStatement {
  /**
   * Determines whether the actions that you specify are denied or allowed on the resource(s) that you specify.
   */
  readonly effect: Effect;

  /**
   * To allow all update actions except for one, use NotAction.
   */
  readonly notAction: ActionValue;

  /**
   * This element is required but supports only the wild card.
   */
  readonly principal: Principal;

  /**
   * Specifies the logical IDs of the resources that the policy applies to.
   */
  readonly resource: string[] | string;

  /**
   * Specifies the resource type that the policy applies to.
   *
   * @default - No Condition
   */
  readonly condition?: Condition;
}

/**
 * You define a stack policy with five elements: Effect, Action, Principal, Resource, and Condition.
 */
export interface NotActionNotResourceStatement {
  /**
   * Determines whether the actions that you specify are denied or allowed on the resource(s) that you specify.
   */
  readonly effect: Effect;

  /**
   * To allow all update actions except for one, use NotAction.
   */
  readonly notAction: ActionValue;

  /**
   * This element is required but supports only the wild card.
   */
  readonly principal: Principal;

  /**
   * To allow updates to all resources except for one, use a NotResource
   */
  readonly notResource: string;

  /**
   * Specifies the resource type that the policy applies to.
   *
   * @default - No Condition
   */
  readonly condition?: Condition;
}

/**
 * You define a stack policy with five elements: Effect, Action, Principal, Resource, and Condition.
 */
export type StackPolicyStatement =
  | ActionNotResourceStatement
  | ActionResourceStatement
  | NotActionNotResourceStatement
  | NotActionResourceStatement;

/**
 * A stack policy is a JSON document that defines the update actions that can be performed on designated resources.
 */
export interface StackPolicyDocument {
  /**
   * A list that defines the stack policy.
   */
  readonly statement: StackPolicyStatement[];
}

/**
 * StackPolicy props interface
 */
export interface StackPolicyProps {
  /**
   * The stack policy document.
   */
  readonly document: StackPolicyDocument;
}

/**
 * Represents a CloudFormation Stack Policy
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html
 */
export class StackPolicy extends Construct {
  /**
   * The stack policy document.
   */
  public readonly document: StackPolicyDocument;

  constructor(scope: Construct, id: string, props: StackPolicyProps) {
    super(scope, id);
    this.document = props.document;
  }

  /**
   * @internal
   */
  public _toCloudFormation(): object {
    return capitalizePropertyNames(this, this.document);
  }
}
