import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('check_ins')
@Index(['userId', 'checkInDate'], { unique: true })
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  /** The participant's LOCAL calendar date at the moment of check-in (YYYY-MM-DD). */
  @Column({ type: 'date' })
  checkInDate: string;

  @Column({ type: 'int', nullable: true })
  mindScore: number | null;

  @CreateDateColumn()
  createdAt: Date;
}
