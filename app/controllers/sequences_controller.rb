class SequencesController < ApplicationController
  before_action :set_sequence, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user_or_admin, only: [:edit, :update, :destroy, :rate]

  # GET /sequences
  # GET /sequences.json
  def index
    if params[:user_id]
      @sequences = Sequence.where(user_id: params[:user_id])
    else
      @sequences = Sequence.all
    end
  end

  # GET /sequences/1
  # GET /sequences/1.json
  def show
    gon.sequence_id = @sequence.id
    if user_signed_in?
      sequence_rating = @sequence.ratings.where({ user_id: current_user.id }).first
      if sequence_rating.nil?
        @rating = 0
      else
        @rating = sequence_rating.score
      end
    else
      @rating = @sequence.average_rating
    end
  end

  # GET /sequences/new
  def new
    @sequence = Sequence.new
    @locations = Location.all
  end

  # GET /sequences/1/edit
  def edit
    gon.sequence_id = @sequence.id
    @locations = Location.all
  end

  # POST /sequences
  # POST /sequences.json
  def create
    @sequence = Sequence.new(sequence_params)
    @sequence.user_id = current_user.id

    respond_to do |format|
      if @sequence.save
        format.html { redirect_to @sequence, notice: 'Sequence was successfully created.' }
        format.json { render :show, status: :created, location: @sequence }
      else
        format.html { render :new }
        format.json { render json: @sequence.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sequences/1
  # PATCH/PUT /sequences/1.json
  def update
    respond_to do |format|
      if @sequence.update(sequence_params)
        format.html { redirect_to @sequence, notice: 'Sequence was successfully updated.' }
        format.json { render :show, status: :ok, location: @sequence }
      else
        format.html { render :edit }
        format.json { render json: @sequence.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sequences/1
  # DELETE /sequences/1.json
  def destroy
    @sequence.destroy
    respond_to do |format|
      format.html { redirect_to sequences_url, notice: 'Sequence was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def rate
    @rating = Rating.find_or_create_by({sequence_id: params[:id], user_id: current_user.id})
    if @rating.update_attribute(:score, params[:score])
      render json: @sequence, status: :ok
    else
      render json: @sequence.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sequence
      @sequence = Sequence.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sequence_params
      params.require(:sequence).permit(:title, :description, :data, :user_id, :location_id)
    end
end
