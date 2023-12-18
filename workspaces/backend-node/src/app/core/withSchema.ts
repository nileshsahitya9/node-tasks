import type {
  FastifySchema,
  RouteShorthandOptionsWithHandler,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  FastifyBaseLogger,
} from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"

export default function withSchema<T extends FastifySchema>(
  opts: RouteShorthandOptionsWithHandler<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RouteGenericInterface,
    ContextConfigDefault,
    T,
    TypeBoxTypeProvider,
    FastifyBaseLogger
  >
) {
  return opts
}
