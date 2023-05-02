import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class VolumeTable {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  PK: number;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  symbol: string;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  pricePcgChangeDailyOpen: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumeUSDT: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange1m: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange5m: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange15m: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange1h: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange4h: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange12h: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange1d: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange3d: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  volumePcgChange1w: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange1m: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange5m: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange15m: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange1h: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange4h: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange12h: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange1d: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange3d: number;

  @Field({ nullable: true })
  @Column({ type: 'numeric', nullable: true })
  tradeAmountPcgChange1w: number;
}
