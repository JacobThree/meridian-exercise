import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: string | null;

  /** IANA timezone chosen by the participant, e.g. "America/Los_Angeles". */
  @Column({ default: 'America/New_York' })
  timezone: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  lastCheckInAt: Date | null;

  @Column({ type: 'varchar', nullable: true })
  pushToken: string | null;
}
